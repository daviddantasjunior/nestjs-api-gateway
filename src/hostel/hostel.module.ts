import { Module } from '@nestjs/common';
import { HostelService } from './hostel.service';
import { HostelResolver } from './hostel.resolver';

@Module({
  imports: [],
  providers: [HostelService, HostelResolver],
  exports: [HostelResolver],
})
export class HostelModule {}
