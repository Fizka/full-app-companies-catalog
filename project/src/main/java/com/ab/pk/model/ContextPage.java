package com.ab.pk.model;

import com.ab.pk.enums.UserStatus;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class ContextPage implements Serializable {
	private String title;
	private String companyName;
	private Long idAppUser;
	private String description;
}
