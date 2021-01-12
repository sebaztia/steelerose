<?php
if(!function_exists('theme_build_comments_tree_from_flat')) {
    function theme_build_comments_tree_from_flat(array &$elements, $parentId = 0, $specificId = false) {
        $branch = array();
        foreach ($elements as &$element) {
            if ($element->comment_parent == $parentId) {
                $children =
                    theme_build_comments_tree_from_flat(
                        $elements,
                        $element->comment_ID
                    );

                if ($children) {
                    $element->comments = $children;
                }

                $branch[$element->comment_ID] = array(
                    "ID" => $element->comment_ID,
                    "name" => $element->comment_author,
                    "date" => $element->comment_date,
                    "content" => $element->comment_content,
                    "avatar" => theme_get_avatar_url($element->comment_author_email),
                    "comments" => $element->comments,
                    "replyLink" =>
                        get_the_permalink() . '?comment-reply=' . $element->comment_ID . '#comment-replies'
                );
                unset($element);
            }
        }
        return $branch;
    }
}