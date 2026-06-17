package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.activities.ActivityEntity;
import com.robinsonir.fittrack.data.repository.activities.ActivitySummaryDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(config = FitTrackMapperConfig.class)
public interface ActivityMapper {
    ActivitySummaryDTO activityEntityToActivitySummaryDTO(ActivityEntity activityEntity);

    List<ActivitySummaryDTO> activityEntityListToActivitySummaryDTOList(List<ActivityEntity> activityEntities);
}
