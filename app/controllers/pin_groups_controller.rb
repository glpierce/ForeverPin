class PinGroupsController < ApplicationController

    def my_groups
        render json: @current_user.pin_groups, status: 200
    end

end
