require "test_helper"

class Public::ItemsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get public_items_create_url
    assert_response :success
  end

  test "should get index" do
    get public_items_index_url
    assert_response :success
  end

  test "should get show" do
    get public_items_show_url
    assert_response :success
  end

  test "should get update" do
    get public_items_update_url
    assert_response :success
  end
end
