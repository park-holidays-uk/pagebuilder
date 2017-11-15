<?php

namespace ParkHolidays\PageBuilder\Database\Seeds;

use Illuminate\Database\Seeder;

use ParkHolidays\PageBuilder\Models\FieldName;

class FieldNameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fieldNames = collect([
            // Input
            (object) [
                'name' => 'forename',
                'label' => 'Forename',
                'type' => 'text',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'surname',
                'label' => 'Surname',
                'type' => 'text',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'email',
                'label' => 'Email Address',
                'type' => 'email',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'mobile_number',
                'label' => 'Mobile Number',
                'type' => 'telepohne',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'postcode',
                'label' => '',
                'type' => '',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'addressline1',
                'label' => 'Address Line 1',
                'type' => 'text',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'addressline2',
                'label' => 'Address Line 2',
                'type' => 'text',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'addressline3',
                'label' => 'Address Line 3',
                'type' => 'text',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'town_city',
                'label' => 'Town or City',
                'type' => 'text',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'county',
                'label' => 'County',
                'type' => 'text',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'finance_amount',
                'label' => 'Finance Amount',
                'type' => 'number',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'min_price',
                'label' => 'Min Price',
                'type' => 'number',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'max_price',
                'label' => 'Max Price',
                'type' => 'number',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'budget',
                'label' => 'Budget',
                'type' => 'number',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'berths',
                'label' => 'Berths',
                'type' => 'number',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'preferred_visit_date',
                'label' => 'Preferred Visit Date',
                'type' => 'date',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'image_upload',
                'label' => 'Upload Image',
                'type' => 'file',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            // Textarea
            (object) [
                'name' => 'question',
                'label' => 'Question',
                'type' => 'textarea',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'comment',
                'label' => 'Comment',
                'type' => 'textarea',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            // Checkbox
            (object) [
                'name' => 'newsletter_sign_up',
                'label' => 'Sign upto Newsletter',
                'type' => 'checkbox',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            // Radio Button
            (object) [
                'name' => 'part_exchange',
                'label' => 'Part Exchange',
                'type' => 'radio',
                'copies' => 2,
                'values' => 'yes,no',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'preferred_visit_time_period',
                'label' => 'Preferred Visit Time',
                'type' => 'radio',
                'copies' => 2,
                'values' => 'am,pm',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'recieve_brochure_by',
                'label' => 'Recieve Brochure By',
                'type' => 'radio',
                'copies' => 2,
                'values' => 'post,download',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'interested_in',
                'label' => 'Interested In',
                'type' => 'radio',
                'copies' => 3,
                'values' => 'caravan,lodges,both',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
            (object) [
                'name' => 'contact_preferences',
                'label' => 'Contact Me By',
                'type' => 'radio',
                'copies' => 3,
                'values' => 'phone,sms,email,post',
                'active_campaign' => 0,
                'elite_parks' => 0                      
            ],
        ]);

        \DB::table('pagebuilder_field_names')->truncate();

        $fieldNames->each(function($item, $key) {
            $field = new FieldName;
            $field->name = $item->name;
            $field->label = $item->label;
            $field->type = $item->type;

            if(isset($item->copies)) { $field->copies = $item->copies; }
            if(isset($item->values)) { $field->values = $item->values; }

            if(isset($item->active_campaign)) { $field->active_campaign = $item->active_campaign; }
            if(isset($item->elite_parks)) { $field->elite_parks = $item->elite_parks; }

            $field->save();
        });
    }
}
