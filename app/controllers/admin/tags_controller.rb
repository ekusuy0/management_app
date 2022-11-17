class Admin::TagsController < ApplicationController

  def new
    @tag = Tag.new
    @tags = Tag.all
  end

  def create
    tag = Tag.new(tag_params)
    tag.save
    redirect_to request.referer
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