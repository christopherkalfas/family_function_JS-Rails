class HouseHoldSerializer 

    def initialize(house_hold_object)
        @house_hold = house_hold_object
    end

    def to_serialized_json
        options = {
            include: {
                chores: {
                    only: [:name, :status, :id, :house_hold_id]
                }
            },      
            except: [:updated_at],
        }
        @house_hold.to_json(options)
    end
end 