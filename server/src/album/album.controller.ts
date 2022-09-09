import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {CreatealbumDto} from "./dto/create-album.dto";
import {ObjectId} from "mongoose";

import {FileFieldsInterceptor} from "@nestjs/platform-express";


@Controller('/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreatealbumDto) {
        const {picture} = files
        return this.albumService.create(dto, picture[0]);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset)
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.albumService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }


    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.albumService.listen(id);
    }
}
