import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { HostelService } from './hostel.service';
import { CreateHostelInput } from './dto/create-hostel.input';
import { UpdateHostelInput } from './dto/update-hostel.input';
import { Hostel } from './hostel.entity';

@Resolver('Hostel')
export class HostelResolver {
  constructor(private hostelService: HostelService) {}

  @Query(() => [Hostel])
  async findAllHostels(): Promise<Hostel[]> {
    const hostels = await this.hostelService.findAllHostels();
    return hostels;
  }

  @Query(() => Hostel)
  async findHostelById(@Args('_id') _id: string): Promise<Hostel> {
    const hostel = await this.hostelService.findByIdHostel(_id);
    return hostel;
  }

  @Mutation(() => Hostel)
  async createHostel(
    @Args('createHostelInput') createHostelInput: CreateHostelInput,
  ): Promise<Hostel> {
    const hostel = await this.hostelService.createHostel(createHostelInput);
    return hostel;
  }

  @Mutation(() => Hostel)
  async updateHostel(
    @Args('_id') _id: string,
    @Args('updateHostelInput') updateHostelInput: UpdateHostelInput,
  ): Promise<Hostel> {
    const hostel = this.hostelService.updateHostel(_id, updateHostelInput);
    return hostel;
  }

  @Mutation(() => Boolean)
  async deleteHostel(@Args('_id') _id: string): Promise<boolean> {
    const deleted = await this.hostelService.deleteHostel(_id);
    return deleted;
  }
}
