import { Controller, Body, Get, Post } from '@nestjs/common';
import { SuggestedMuvies } from './schema/muvie.schema/muvie.schema';
import { SuggestedMuviesService } from './suggested-muvies.service';

@Controller('suggested-muvies')
export class SuggestedMuviesController {
    constructor(
        private service: SuggestedMuviesService) { }

    @Get()
    async getAll() {
        return this.service.getAll()
    }

    @Post()
    async suggestMuvie(@Body() muvie: SuggestedMuvies) {

        return this.service.suggest(muvie);
    }
}
