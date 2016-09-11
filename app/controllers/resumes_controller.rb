# include ActionView::Helpers::TextHelper
class ResumesController < ApplicationController
  respond_to :json, :html
  before_action :authenticate_user!
  # before_action :check_interviewer

  def index
    # @all_data = @arr = []
    @resumes = Resume.all
    # respond_with do |format|
      #format.json do
    respond_with @resumes.to_json(only: [:name, :phone, :skill, :salary, :id, :skype], include: { :communications => {only: [:date, :mark, :resume_id, :id]}})
     # end
    # end
    # @resumes.each do |r|
    #   @arr.push(r)
    #   @arr.push(r.communications)
    #   @all_data.push(@arr)
    #   @arr = []
    # end
    # @all = [[{a1:'a1', a2:'a2', a3:'a3'},{a1:'b1', a2:'b2', a3:'b3' }],[{a1:'c1', a2:'c2', a3:'c3'},{a1:'d1', a2:'d2', a3:'d3'}],[{a1:'e1', a2:'e2', a3:'e3'},{a1:'f1', a2:'f2', a3:'f3'}]]
    # @all = [ [1,2,3], [4,5,6], [7,8,9] ]
    # @alldata = [{a1:'a1'},{a1:'a2'},{a1:'a3'},{a1:'a4'},{a1:'a5'}]

    # @data = { alldata: @alldata }
    # respond_with { @resumes, :include => {:communication}, :only => [:name, :phone, :skill, :salary, :id, :skype] }
    # render json: { @resumes.to_json{ :only=>[:name, :phone, :skill, :salary, :id, :skype], :include=>[:profile] } }
    # respond_with @resumes
  end

  def new
    respond_with Resume.new
  end

  def show
    @resume = Resume.find params[:id]
    @data = { education: @resume.educations, experience: @resume.experiences, resume: @resume }
    respond_with @data
  rescue ActiveRecord::RecordNotFound
    render json: { message: "SHOW Resume doesn't exist!" }, status: 404
  end

  def create
    @resume = Resume.new(resume_params)
    if @resume.save
      render json: { id: @resume.id }
    else
      render json: { error: "Resume wasn't created!" }
    end
  end

  def edit
    @resume = Resume.find params[:id]
    @data = { education: @resume.educations, experience: @resume.experiences, resume: @resume }
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
      params.require(:resume).permit(:name, :age, :email, :skype, :salary, :city, :phone, :dateofbirth, :comment, :proffession, :status, :skill, :work, :proff, :language, :level, :date, :mark)
    end
end
