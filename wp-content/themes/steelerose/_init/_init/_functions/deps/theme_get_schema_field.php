<?php
if(!function_exists('theme_get_schema_field')) {
    function theme_get_schema_field($schema, $field) {
        $schema = theme_get_schema($schema);
        if(isset($schema->errors)) {
            return $schema->errors;
        }

        if(isset($schema->{$field})) {
            return (object) $schema->{$field};
        }

        return (object) array(
            'errors' =>
                theme_get_message(
                    'Other',
                    'error',
                    'no_schema_field',
                    array($field)
                )
        );

    }
}