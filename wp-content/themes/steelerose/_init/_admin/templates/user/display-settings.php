<h3><?php _e("Display settings", "blank"); ?></h3>

<table class="form-table">
    <tr>
        <th scope="row">
            <?php _e("Enable public profile?"); ?>
        </th>
        <td>
            <label for="enable_public">
                <input
                        name="enable_public"
                        type="checkbox"
                        id="enable_public"
                        value="1"
                        <?= ($data->customd['enable_public'] ? 'checked' : '') ?>
                >
                <?php _e("Checking this will allow this users data to be publicly queryable through the API") ?>
            </label>
        </td>
    </tr>
</table>