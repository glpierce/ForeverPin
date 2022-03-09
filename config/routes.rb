Rails.application.routes.draw do
  resources :route_pins
  resources :routes
  resources :pin_groups
  resources :friendships, only: [:destroy, :update, :create]
  resources :pins, only: [:show, :update, :create, :destroy]
  resources :users, only: [:create, :update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post "/login", to: "sessions#create"
  get "/me", to: "sessions#show"
  post "/accountCheck", to: "sessions#accountCheck"
  post "/updateCheck", to: "users#updateCheck"
  delete "/logout", to: "sessions#destroy"
  get "/requests", to: "friendships#requests"
  get "/friends", to: "friendships#friends"
  get "/my_pins", to: "pins#my_pins"
  get "/my_routes", to: "routes#my_routes"
  get "/my_groups", to: "pin_groups#my_groups"
  post "/userSearch", to: "users#search"
  # Defines the root path route ("/")
  # root "articles#index"
end
