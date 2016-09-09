class AddSpecialtyToEducations < ActiveRecord::Migration
  def change
    add_column :educations, :specialty, :string
    remove_column :educations, :speciality, :string
  end
end
