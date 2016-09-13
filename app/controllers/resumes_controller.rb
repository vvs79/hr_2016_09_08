# include ActionView::Helpers::TextHelper
class ResumesController < ApplicationController
  respond_to :json, :html
  before_action :authenticate_user!
  # before_action :check_interviewer

  def index
    @resumes = Resume.all
    respond_with @resumes.to_json(only: [:name, :phone, :skill, :salary, :id, :skype, :proffession, :status, :age], include: { :communications => {only: [:date, :mark, :resume_id, :id]}})
  end

  def new
    respond_with Resume.new
  end

  def show
    @resume = Resume.find params[:id]
    @data = { communication: @resume.communications, education: @resume.educations, experience: @resume.experiences, resume: @resume }
    respond_with @data
  rescue ActiveRecord::RecordNotFound
    render json: { message: "SHOW Resume doesn't exist!" }, status: 404
  end

  def create
    @resume = Resume.new(resume_params)
    # @resume.file = params[:file]
    if @resume.save
      render json: { id: @resume.id }
    else
      render json: { error: "Resume wasn't created!" }
    end
  end

  def edit
    @resume = Resume.find params[:id]
    @data = { communication: @resume.communications, education: @resume.educations, experience: @resume.experiences, resume: @resume }
    respond_with @data
  rescue ActiveRecord::RecordNotFound
    render json: { error: "EDIT Resume doesn't exist!" }, status: 404
  end

  def update
    @resume = Resume.find(params[:id])
    if @resume.update(resume_params)
      render json: { response: "UPDATE Resume was successfully updated" }, status: 200
    else
      render json: { error: "Resume wasn't updated!" }
    end
  end

  def destroy
    respond_with Resume.destroy params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "DEL Resume doesn't exist!" }, status: 404
  end

  private

    def resume_params
      params.require(:resume).permit(:user_id, :name, :file, :age, :email, :skype, :salary, :city, :phone, :dateofbirth, :comment, :proffession, :status, :skill, :work, :proff, :language, :level, :date, :mark)
    end
end
