Rails.application.routes.draw do  
<<<<<<< HEAD
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
=======
  get 'welcome/home'
>>>>>>> 5995af227efa2b48d49e520eddf15ae773599f01
  get '/app', to: 'homepage#index', as: 'app'

  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      delete 'destroy/:id', to: 'posts#destroy'
    end
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
