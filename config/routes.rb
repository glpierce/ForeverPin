Rails.application.routes.draw do
  resources :route_pins
  resources :routes
  resources :pin_groups
  resources :friendships, only: [:destroy, :update, :create]
  resources :pins
  resources :users, only: [:create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post "/login", to: "sessions#create"
  get "/me", to: "sessions#show"
  post "/accountCheck", to: "sessions#accountCheck"
  delete "/logout", to: "sessions#destroy"
  get "/requests", to: "friendships#requests"
  get "/friends", to: "friendships#friends"
  post "/userSearch", to: "users#search"
  # Defines the root path route ("/")
  # root "articles#index"
end
