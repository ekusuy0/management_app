class Admin::TagsController < ApplicationController

  def new
    @tag = Tag.new
    @tags = Tag.all
  end

  def create
  end

  def edit
  end

  def update
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end