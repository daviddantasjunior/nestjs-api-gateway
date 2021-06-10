import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import slug from 'slugify';
import { CreateHostelInput } from './dto/create-hostel.input';
import { UpdateHostelInput } from './dto/update-hostel.input';
import { Hostel } from './hostel.entity';

@Injectable()
export class HostelService {
  private clientHostel: ClientProxy;

  constructor() {
    this.clientHostel = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5672/nestjs'],
        queue: 'nestjs-search',
      },
    });
  }

  findAllHostels(): Promise<Hostel[]> {
    const hostels = this.clientHostel.send('find-all-hostels', '');
    return hostels.toPromise();
  }

  findByIdHostel(_id: string): Promise<Hostel> {
    const hostel = this.clientHostel.send('find-by-id-hostel', _id);
    return hostel.toPromise();
  }

  createHostel(createHostelInput: CreateHostelInput): Promise<Hostel> {
    createHostelInput.slug = slug(createHostelInput.name, {
      lower: true,
    });

    const hostel = this.clientHostel.emit('create-hostel', createHostelInput);

    return hostel.toPromise();
  }

  async updateHostel(
    _id: string,
    updateHostelInput: UpdateHostelInput,
  ): Promise<Hostel> {
    const hostel = await this.clientHostel
      .send('find-by-id-hostel', _id)
      .toPromise();
    if (hostel) {
      if (!updateHostelInput.slug) {
        updateHostelInput.slug = slug(updateHostelInput.name, {
          lower: true,
        });
      }
      const hostelUpdated = this.clientHostel.send('update-hostel', {
        _id,
        updateHostelInput,
      });
      return await hostelUpdated.toPromise();
    } else {
      throw new BadRequestException(`Hostel not registered!`);
    }
  }

  async deleteHostel(_id: string): Promise<boolean> {
    const deleted = await this.clientHostel
      .send('delete-hostel', { _id })
      .toPromise();
    return deleted;
  }
}
