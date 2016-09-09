# include ActionView::Helpers::TextHelper
class CommunicationsController < ApplicationController
  respond_to :json, :html
  before_action :authenticate_user!
  # before_action :check_interviewer

  def index
    respond_with Communication.all
  end

  def new
    respond_with Communication.new
  end

  def show
    respond_with Communication.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { message: "SHOW Communication doesn't exist!" }, status: 404
  end

  def create
    @communication = Communication.new(communication_params)
    if @communication.save
      render json: { success: "Communication was created" }
    else
      render json: { error: "Communication wasn't created!" }
    end
  end

  def edit
    respond_with Communication.find params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "EDIT Communication doesn't exist!" }, status: 404
  end

  def update
    @communication = Communication.find(params[:id])
    if @communication.update(communication_params)
      render json: { response: "UPDATE Communication was successfully updated" }, status: 200
    else
      render json: { error: "Communication wasn't updated!" }
    end
  end

  def destroy
    respond_with Communication.destroy params[:id]
  rescue ActiveRecord::RecordNotFound
    render json: { error: "DEL Communication doesn't exist!" }, status: 404
  end

  private

    def communication_params
      params.require(:communication).permit(:date, :mark, :resume_id)
    end
end