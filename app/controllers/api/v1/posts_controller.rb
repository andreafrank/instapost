class Api::V1::PostsController < ApplicationController

  def index
     post = Post.all.order(created_at: :desc)

    if user_signed_in? 
      render json: post
    else
      render json: {}, status: 401
    end
  end

  def create
  	post = Post.create!(post_params)

    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    if post
      # render json: post, include: :user
      Post.as_json(methods: [:user_email])
    else
      render json: post.errors
    end
  end

  def destroy
  	post&.destroy
    render json: { message: 'Post deleted!' }
  end

  private
  def post_params
    params.require(:post).permit(:title, :description, :price, :user_id)
  end

  def post
     @post ||= Post.find(params[:id])
  end
end
