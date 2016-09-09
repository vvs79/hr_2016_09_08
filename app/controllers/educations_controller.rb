# include ActionView::Helpers::TextHelper
class EducationsController < ApplicationController
  respond_to :json, :html
  before_action :authenticate_user!
  # before_action :check_interviewer

  def index
    respond_with Education.all
  end

  def new
    respond_with Education.new
  end

  def show
    respond_with Education.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { message: "SHOW Education doesn't exist!" }, status: 404
  end

  def create
    @education = Education.new(education_params)
    if @education.save
      render json: { success: "Education was created" }
    else
      render json: { error: "Education wasn't created!" }
    end
  end

  def edit
    respond_with Education.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "EDIT Education doesn't exist!" }, status: 404
  end

  def update
    @education = Education.find(params[:id])
    if @education.update(education_params)
      render json: { response: "UPDATE Education was successfully updated" }, status: 200
    else
      render json: { error: "Education wasn't updated!" }
    end
  end

  def destroy
    respond_with Education.destroy params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "DEL Education doesn't exist!" }, status: 404
  end

  private

    def education_params
      params.require(:education).permit(:specialty, :from, :to, :place, :resume_id)
    end
end
