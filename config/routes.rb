Rails.application.routes.draw do

  # ユーザー側
  # UEL / users/sign_in ..
  devise_for :users,skip: [:passwords], controllers: {
    registrations: "public/registrations",
    sessions: 'public/sessions'
  }

  root to: 'public/home#top'

  scope module: :public do
    get 'users/my_page' => 'users#show'
    get 'users/information/edit' => 'users#edit'
    patch 'users/information' => 'users#update'

    resources :items, only: [:create, :index, :show, :update]
    resources :tags, only: [:create, :index, :edit, :update]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
