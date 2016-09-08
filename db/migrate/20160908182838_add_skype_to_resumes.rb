class AddSkypeToResumes < ActiveRecord::Migration
  def change
    add_column :resumes, :skype, :string
    remove_column :resumes, :scype, :string
  end
end
