class RemoveCommunicationFromResumes < ActiveRecord::Migration
  def change
    remove_column :resumes, :communication, :string
    remove_column :resumes, :mark, :string
  end
end
