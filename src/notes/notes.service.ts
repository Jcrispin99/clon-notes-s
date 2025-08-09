import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { RpcException } from '@nestjs/microservices';

import { PrismaClient } from '../../generated/prisma';
@Injectable()
export class NotesService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
  }
  async create(createNoteDto: CreateNoteDto) {
    try {
      return await this.note.create({
        data: createNoteDto,
      });
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  async findAll(id: string) {
    return await this.note.findMany({
      where: {
        id: id,
      }
    });
  }


}
