import { Module } from '@nestjs/common';
import { Routes, RouterModule  } from '@nestjs/core';


const routes: Routes = [
    {
        path: '/v1',
        children: []
    },
];


@Module({
    imports: [
        RouterModule.register(routes),
    ]
})
export class V1Module {}
