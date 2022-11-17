class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|

      t.string :name, null: false
      t.integer :user_id

      t.timestamps
    end
  end
end
