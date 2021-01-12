<?php
function theme_is_user_in_role( $user_id, $role  ) {
    return in_array( $role, theme_get_user_roles_by_user_id( $user_id ) );
}