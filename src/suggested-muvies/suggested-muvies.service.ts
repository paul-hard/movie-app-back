import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuggestedMuvies, SuggestedMuviesDocument } from './schema/muvie.schema/muvie.schema'

@Injectable()
export class SuggestedMuviesService {

    constructor(@InjectModel(SuggestedMuvies.name) private suggestedMuviesModel: Model<SuggestedMuviesDocument>) { }

    async getAll(): Promise<SuggestedMuvies[]> {
        return this.suggestedMuviesModel.find().exec();
    }

    async suggest(muvie: SuggestedMuvies) {
        const newMuvie = new this.suggestedMuviesModel(muvie);
        return newMuvie.save()
    }

}

