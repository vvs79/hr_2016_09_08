# include ActionView::Helpers::TextHelper
class ResumesController < ApplicationController
  respond_to :json, :html
  before_action :authenticate_user!
  # before_action :check_interviewer

  def index
    # @resumes = Resume.all
    respond_with Resume.all
  end

  # def new
  #   @resume = Resume.new
  # end

  def show
    respond_with Resume.find params[:id]
  #   @resume = Resume.find(params[:id])
  # rescue ActiveRecord::RecordNotFound
  #   flash[:danger] = 'Person does not exist!'
  #   redirect_to resumes_path
  end

  def create
    respond_with Resume.create resume_params
    # @person = Resume.new(resume_params)
    # if @person.save
    #   redirect_to resume_path(@resume)
    # else
    #   render 'new'
    # end
  end

  def edit
    respond_with Resume.find params[:id]
  #   @resume = Resume.find(params[:id])
  #   respond_with @resume
  # rescue ActiveRecord::RecordNotFound
  #   render json: { error: "Resume doesn't exist!" }, status: 404
  end

  def destroy
    respond_with Resume.destroy params[:id]
    # Resume.find(params[:id]).destroy
    # flash[:success] = 'Resume deleted'
    # redirect_to resumes_path
  end

  private

    def resume_params
      params.require(:resume).permit(:name, :age)
    end
end
