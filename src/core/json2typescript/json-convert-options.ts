/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Internal constants.
 */
export class Settings {
    static readonly MAPPING_PROPERTY = '__jsonconvert__mapping__';
    static readonly MAPPER_PROPERTY = '__jsonconvert__mapper__';
    static readonly CLASS_IDENTIFIER = '__jsonconvert__class_identifier__';
}

/**
 * Internal mapping options for a property.
 */
export class MappingOptions {
    classPropertyName = '';
    jsonPropertyName = '';
    expectedJsonType?: string = undefined;
    isOptional = false;
    customConverter: any = null;
    userData: any = null;
}
