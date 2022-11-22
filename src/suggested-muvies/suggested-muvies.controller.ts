import { Controller, Get, Post } from '@nestjs/common';
import { SuggestedMuviesService } from './suggested-muvies.service';

@Controller('suggested-muvies')
export class SuggestedMuviesController {
    constructor(
        private service: SuggestedMuviesService) { }

    @Get()
    async getAll() {
        return this.service.getAll()
    }
}
