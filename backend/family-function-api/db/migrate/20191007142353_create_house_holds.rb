class CreateHouseHolds < ActiveRecord::Migration[5.2]
  def change
    create_table :house_holds do |t|
      t.string :name
      t.text :members

      t.timestamps
    end
  end
end
