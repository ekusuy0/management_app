Rails.application.routes.draw do

  # 管理者側
  # URL /admin/sign_in ..
  devise_for :admin, skip: [:registrations, :passwords], controllers: {
    sessions: "admin/sessions"
  }

  # ユーザー側
  # UEL /users/sign_in ..
  devise_for :users,skip: [:passwords], controllers: {
    registrations: "public/registrations",
    sessions: 'public/sessions'
  }

  root to: 'public/homes#top'

  scope module: :public do
    get 'users/my_page' => 'users#show'
    get 'users/information/edit' => 'users#edit'
    patch 'users/information' => 'users#update'

    resources :items, only: [:create, :index, :show, :destroy]
  end

  namespace :admin do
    get '/' => 'tags#new'
    resources :tags, only: [:create, :destroy]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
