class AddSpecialtyToExperiences < ActiveRecord::Migration
  def change
    add_column :experiences, :specialty, :string
    remove_column :experiences, :speciality, :string
  end
end
