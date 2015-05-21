Rails.application.routes.draw do
  resources :posts, except: [:new, :edit]
  resource :root, only: [:index]
  root "root#index"
end
