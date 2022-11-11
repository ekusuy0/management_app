class Public::HomesController < ApplicationController

  def top
    @user = current_user
    @item = Item.new
    @tag = Tag.new
    @tags = Tag.all
  end
end
