class Public::TagsController < ApplicationController

  def create
    tag = current_user.tags.new(tag_params)
    tag.save
    redirect_to request.referer
  end

  def index
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
