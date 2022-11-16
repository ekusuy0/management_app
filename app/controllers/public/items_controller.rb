class Public::ItemsController < ApplicationController

  def create
    item = current_user.items.new(item_params)
    item.save
    redirect_to item_path(item.id)
  end

  def index
    @items = current_user.items.all.order(created_at: :desc)
  end

  def show
    @item = Item.find(params[:id])
  end

  def destroy
    item = Item.find(params[:id])
    item.destroy
    redirect_to items_path
  end

  private

  def item_params
    params.require(:item).permit(:name, :elapsed_time, :start_time, :end_time, :tag_id)
  end
end
