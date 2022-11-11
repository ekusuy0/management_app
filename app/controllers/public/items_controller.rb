class Public::ItemsController < ApplicationController

  def create
    item = current_user.items.new(item_params)
    item.save
    redirect_to item_path(item.id)
  end

  def index
  end

  def show
    @item = Item.find(params[:id])
  end

  def update
  end

  private

  def item_params
    params.require(:item).permit(:name, :elapsed_time, :start_time, :end_time, :tag_id)
  end
end
