class UsersController < ApplicationController
  before_action :set_users, only: [:index]
  
  def index
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  def edit
  end
  
  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
  
  def set_users
    if params[:keyword].present?
      @users = User.where('name LIKE(?)', "#{params[:keyword]}%").where.not(id: current_user.id)
    end

    # if params[:keyword].present?
    #   group = Group.find(params[:id])
    #   @users = User.where('name LIKE(?)', "#{params[:keyword]}%").where.not(id: group.user_id)
    # end
  end
end