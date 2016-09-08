# include ActionView::Helpers::TextHelper
class ResumesController < ApplicationController
  respond_to :json, :html
  before_action :authenticate_user!
  # before_action :check_interviewer

  def index
    # @resumes = Resume.all
    respond_with Resume.all
  end

  def new
    respond_with Resume.new
  end

  def show
    respond_with Resume.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { message: "SHOW Resume doesn't exist!" }, status: 404
  end

  def create
    @resume = Resume.new(resume_params)
    if @resume.save
      render json: { response: "Resume was successfully created" }
    else
      render json: { error: "Resume wasn't created!" }
    end
  end

  def edit
    respond_with Resume.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "EDIT Resume doesn't exist!" }, status: 404
  end

  def update
    @resume = Resume.find(params[:id])
    if @resume.update(resume_params)
      render json: { response: "UPDATE Resume was successfully updated" }, status: 200
    end
  end

  def destroy
    respond_with Resume.destroy params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "DEL Resume doesn't exist!" }, status: 404
  end

  private

    def resume_params
      params.require(:resume).permit(:name, :age, :email, :skype, :salary, :city, :phone, :dateofbirth, :comment, :proffession, :status)
    end
end
