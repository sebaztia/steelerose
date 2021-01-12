<?php
if(!function_exists('theme_get_schema')) {
    function theme_get_schema($schema) {
        if(!strpos('Schema/', $schema)) {
            $schema = 'Schema/' . $schema;
        }

        $field_groups = acf_get_field_groups();
        foreach ( $field_groups as $group ) {
            if($group['title']===$schema) {
                $fields = get_posts(array(
                    'posts_per_page'   => -1,
                    'post_type'        => 'acf-field',
                    'orderby'          => 'menu_order',
                    'order'            => 'ASC',
                    'suppress_filters' => true,
                    'post_parent'      => $group['ID'],
                    'post_status'      => 'any',
                    'update_post_meta_cache' => false
                ));
                foreach ( $fields as $field ) {
                    $options[$group['title']]
                    [$field->post_excerpt] =
                        (object) array(
                            'data' =>
                                unserialize($field->post_content),
                            'name' =>
                                $field->post_excerpt,
                            'id' =>
                                $field->post_name
                    );

                }

                return (object) $options[$schema];
            }
        }

        return (object) array(
            'errors' =>
            theme_get_message(
                'Other',
                'error',
                'no_schema',
                array($schema)
            )
        );
    }
}