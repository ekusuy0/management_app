require "test_helper"

class Admin::TagsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get admin_tags_create_url
    assert_response :success
  end

  test "should get index" do
    get admin_tags_index_url
    assert_response :success
  end

  test "should get edit" do
    get admin_tags_edit_url
    assert_response :success
  end

  test "should get update" do
    get admin_tags_update_url
    assert_response :success
  end
end
