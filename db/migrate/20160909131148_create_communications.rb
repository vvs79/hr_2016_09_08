class CreateCommunications < ActiveRecord::Migration
  def change
    create_table :communications do |t|
      t.date    :date
      t.integer :mark
      t.integer :resume_id

      t.timestamps null: false
    end
  end
end
