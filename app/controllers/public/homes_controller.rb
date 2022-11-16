class Public::HomesController < ApplicationController

  def top
    @user = current_user
    @item = Item.new
    @tags = Tag.all
  end
end
