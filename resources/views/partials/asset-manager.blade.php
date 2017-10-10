<div class="gjs-am-assets-header" style="margin-bottom: 10px; padding: 5px 0;">
    <!-- Add Search and Filters Here -->
    <form class="gjs-am-add-asset">
        <div class="gjs-am-select-filters">
            <div>
        
                <div class="gjs-sm-label">
                    <span class="gjs-sm-icon " title="">
                        Types
                    </span>
                </div>

                <div class="gjs-fields">
                    <div class="gjs-field gjs-select">
                        <span id="gjs-sm-input-holder">
                            <select id="gjs-am-filter-types" size="3" multiple>
                                @foreach($viewModel->types as $type)
                                <option value="{{ $type->media_lookup_type }}">{{ $type->media_lookup_type }}</option>
                                @endforeach
                            </select>
                        </span>
                        <!-- <div class="gjs-sel-arrow">
                            <div class="gjs-d-s-arrow"></div>
                        </div> -->
                    </div>
                
                </div>    
            </div>

            <div>

                <div class="gjs-sm-label">
                    <span class="gjs-sm-icon " title="">
                        Tags
                    </span>
                </div>

                <div class="gjs-fields">
        
                    <div class="gjs-field gjs-select">
                        <span id="gjs-sm-input-holder">
                            <select id="gjs-am-filter-tags" size="3" multiple>
                                @foreach($viewModel->tags as $tag)
                                <option value="{{ $tag->media_lookup_tag }}">{{ $tag->media_lookup_tag }}</option>
                                @endforeach
                            </select>
                        </span>
                        <!-- <div class="gjs-sel-arrow">
                            <div class="gjs-d-s-arrow"></div>
                        </div> -->
                    </div>
                
                </div>    
            </div>

            <div>

                <div class="gjs-sm-label">
                    <span class="gjs-sm-icon " title="">
                        Parks
                    </span>
                </div>

                <div class="gjs-fields">
        
                    <div class="gjs-field gjs-select">
                        <span id="gjs-sm-input-holder">
                            <select id="gjs-am-filter-parks" size="3" multiple>
                                @foreach($viewModel->parks as $park)
                                <option value="{{ $park->id }}">{{ $park->name }}</option>
                                @endforeach
                            </select>
                        </span>
                        <!-- <div class="gjs-sel-arrow">
                            <div class="gjs-d-s-arrow"></div>
                        </div> -->
                    </div>
                
                </div>    
            </div>
        </div>

        
        <div class="gjs-sm-label">
            <span class="gjs-sm-icon " title="">
                Search
            </span>
        </div>
        
        <div class="gjs-field gjs-am-add-field">
            <input id="gjs-am-search-criteria" placeholder="Search criteria.." />
        </div>
        <button id="gjs-am-search-btn" class="gjs-btn-prim">Find Images</button>
        <div style="clear:both"></div>
    </form>
</div>
<div class="gjs-am-assets-cont">
    <div class="gjs-am-assets" data-el="assets">
        <!-- ASSETS GET LOADED HERE -->
    </div>
</div>
<div id="gjs-am-pager" class="gjs-am-assets-header" style="margin-top: 10px; padding: 5px 0;">
    <!-- PAGINATION GOES HERE -->
</div>