// This file is auto-generated by @hey-api/openapi-ts

export const $generate__Input = {
    type: 'object',
    title: 'generate__Input',
    required: ['img'],
    properties: {
        img: {
            format: 'image',
            title: 'Img',
            type: 'file'
        },
        txt: {
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'null'
                }
            ],
            default: null,
            title: 'Txt'
        }
    }
} as const;

export const $InvalidArgument = {
    type: 'object',
    title: 'InvalidArgument',
    required: ['msg', 'type'],
    properties: {
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    description: 'Bad Request'
} as const;

export const $NotFound = {
    type: 'object',
    title: 'NotFound',
    required: ['msg', 'type'],
    properties: {
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    description: 'Not Found'
} as const;

export const $InternalServerError = {
    type: 'object',
    title: 'InternalServerError',
    required: ['msg', 'type'],
    properties: {
        msg: {
            type: 'string',
            title: 'Message'
        },
        type: {
            type: 'string',
            title: 'Error Type'
        }
    },
    description: 'Internal Server Error'
} as const;