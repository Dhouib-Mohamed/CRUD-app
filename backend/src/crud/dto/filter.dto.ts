import {PartialType} from '@nestjs/mapped-types';

class FilterCrudDto {
    pageSize?: number;
    pageIndex?: number;
    filter?: {
        nameSearch?: string;
        unitPrice?: {
            min?: number;
            max?: number;
        };
        quantity?: {
            min?: number;
            max?: number;
        };
    };
    sort?: {
        name?: string;
        direction?: string;
    };
}

export class FilterDto extends PartialType(FilterCrudDto) {
}
