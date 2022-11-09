class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      
      t.integer :user_id, null: false
      t.integer :tag_id, null: false
      t.string :name, null: false
      t.datetime :elapsed_time, null: false

      t.timestamps
    end
  end
end
