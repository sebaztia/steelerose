<?php
if(!function_exists('theme_build_menu_tree_from_flat')) {
    function theme_build_menu_tree_from_flat(array &$elements, $parentId = 0)
    {
        $branch = array();
        foreach ($elements as &$element) {
            if ($element->menu_item_parent == $parentId) {
                $children =
                    theme_build_menu_tree_from_flat(
                        $elements,
                        $element->ID
                    );

                if ($children) {
                    $element->wpse_children = $children;
                    $element->subs = $children;
                }

                $branch[$element->ID] = $element;
                unset($element);
            }
        }
        return $branch;
    }
}